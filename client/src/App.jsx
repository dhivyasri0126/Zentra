                  import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatArea from './components/ChatArea.jsx';
import NewSessionWizard from './components/NewSessionWizard.jsx';
import SessionsTable from './components/SessionsTable.jsx';
import ImageHistory from './components/ImageHistory.jsx';
import ExamplesPage from './components/ExamplesPage.jsx';
import LandingPage from './components/LandingPage.jsx';
import ComponentReference from './components/ComponentReference.jsx';
import { zentraApi } from './services/api/index.js';

function AppContent() {
  const [conversations, setConversations] = useState([]); // [] as default
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [messages, setMessages] = useState([]); // [] as default
  const [suggestedQuestions, setSuggestedQuestions] = useState([]); // [] as default
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [currentView, setCurrentView] = useState('workspace'); // workspace | new-session | sessions | image-history | examples | landing | token-page
  const [sessionTitle, setSessionTitle] = useState('New Session');

  // Restore persisted sessions so history survives browser refreshes.
  useEffect(() => {
    async function loadSessions() {
      try {
        const [res, imageRes] = await Promise.all([
          zentraApi.getAllSessions(),
          zentraApi.getImageHistory(),
        ]);
        const restoredSessions = (res?.sessions || []).map((session) => ({
          id: session.id,
          title: session.title,
          imageCount: session.imageCount,
          messageCount: session.messageCount,
          time: new Date(session.lastActivity).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
          }),
          created: session.createdAt,
          thumbnail: session.thumbnail || '',
        }));
        setConversations(restoredSessions);
        setImageHistory(imageRes?.images || []);
      } catch (err) {
        setErrorMessage(err.message || 'Unable to load image history. Please refresh and try again.');
      }
    }
    loadSessions();
  }, []);

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setActiveImage(null);
    setPreviousImage(null);
    setMessages([]);
    setSuggestedQuestions([]);
    setErrorMessage('');
    setSessionTitle('New Session');
  };

  const handleSelectConversation = async (id) => {
    setActiveConversationId(id);
    setErrorMessage('');
    const target = conversations.find((c) => c.id === id);
    if (target) {
      setSessionTitle(target.title);
      setActiveImage(
        target.thumbnail
          ? {
              id: `history-${target.id}`,
              name: target.title || 'Saved image',
              url: target.thumbnail,
              type: target.thumbnail.match(/^data:([^;]+)/)?.[1] || 'image/jpeg',
            }
          : null
      );
    }

    try {
      const res = await zentraApi.getSessionHistory(id);
      if (res?.history?.length > 0) {
        const mappedMessages = [];
        let latestSuggestions = [];

        res.history.forEach((turn) => {
          if (turn.userPrompt) {
            mappedMessages.push({
              role: 'user',
              content: turn.userPrompt,
              timestamp: new Date(turn.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
          }

          if (turn.aiResponse) {
            const ai = turn.aiResponse;
            if (ai.suggested_questions?.length > 0) latestSuggestions = ai.suggested_questions;
            mappedMessages.push({
              role: 'assistant',
              content:
                ai.verified_answer ||
                (ai.sufficient ? 'Visual evidence verified.' : 'Visual evidence analysis completed.'),
              sufficient: ai.sufficient,
              missingEvidence: ai.missing_evidence,
              nextBestView: ai.next_best_view_prompt,
              timestamp: new Date(turn.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
          }
        });

        setMessages(mappedMessages);
        setSuggestedQuestions(latestSuggestions);
      } else {
        setMessages([]);
        setSuggestedQuestions([]);
      }
    } catch {
      // Keep existing messages if backend fetch fails
    }
  };

  const handleClearConversation = async (id) => {
    try {
      await zentraApi.deleteSession(id);
      const filtered = conversations.filter((c) => c.id !== id);
      setConversations(filtered);
      if (activeConversationId === id) {
        if (filtered.length > 0) {
          handleSelectConversation(filtered[0].id);
        } else {
          handleNewConversation();
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to clear this session. Please try again.');
    }
  };

  const handleUploadImage = async (file, analysisPrompt, startNewSession = false) => {
    setIsLoading(true);
    setLoadingMessage('Uploading & evaluating visual evidence...');
    setErrorMessage('');

    try {
      const previewUrl = URL.createObjectURL(file);
      const newImageData = {
        id: `img-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.type,
        previewUrl,
        file,
      };

      if (activeImage) setPreviousImage(activeImage);
      setActiveImage(newImageData);

      // Call backend
      const result = await zentraApi.verifyVisualEvidence({
        file,
        sessionId: startNewSession ? undefined : activeConversationId || undefined,
        userPrompt:
          analysisPrompt?.trim() ||
          'Identify the visible objects and describe the scene in this image. Only report what is visually supported by the image.',
      });

      // Store session info if new
      if (result.sessionId) {
        setActiveConversationId(result.sessionId);
        setConversations((prev) => {
          const exists = prev.find((c) => c.id === result.sessionId);
          if (exists) return prev;
          return [
            {
              id: result.sessionId,
              title: file.name,
              imageCount: '1 image',
              time: 'Just now',
              thumbnail: previewUrl,
              created: new Date(),
            },
            ...prev,
          ];
        });
      }

      setImageHistory((prev) => [
        {
          id: `pending-${newImageData.id}`,
          sessionId: result.sessionId,
          sessionTitle: file.name,
          name: file.name,
          mimeType: file.type,
          imageData: previewUrl,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      if (result.suggested_questions?.length > 0) {
        setSuggestedQuestions(result.suggested_questions);
      }

      const assistantMsg = {
        role: 'assistant',
        content:
          result.verified_answer ||
          (result.sufficient ? 'Visual evidence verified.' : `Image "${file.name}" received. Check suggested questions or ask below.`),
        sufficient: result.sufficient,
        missingEvidence: result.missing_evidence,
        nextBestView: result.next_best_view_prompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setErrorMessage(err.message || 'Image evaluation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (question) => {
    if (!question) return;
    setErrorMessage('');

    const userMsg = {
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsLoading(true);
    setLoadingMessage('Validating evidence with Zentra AI Engine...');

    try {
      const result = await zentraApi.verifyVisualEvidence({
        file: activeImage?.file || undefined,
        sessionId: activeConversationId || undefined,
        userPrompt: question,
      });

      if (result.sessionId && !activeConversationId) {
        setActiveConversationId(result.sessionId);
      }

      if (result.suggested_questions?.length > 0) {
        setSuggestedQuestions(result.suggested_questions);
      }

      const assistantMsg = {
        role: 'assistant',
        content:
          result.verified_answer ||
          (result.sufficient ? 'Visual evidence verified.' : 'Evidence insufficient for a 100% verified answer.'),
        sufficient: result.sufficient,
        missingEvidence: result.missing_evidence,
        nextBestView: result.next_best_view_prompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setErrorMessage(err.message || "Zentra Vision couldn't verify this visual evidence. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartSessionFromWizard = (wizardData) => {
    handleNewConversation();
    if (wizardData.uploadedFile?.file) {
      handleUploadImage(wizardData.uploadedFile.file, wizardData.question, true);
    }
    setCurrentView('workspace');
  };

  // Render special views
  if (currentView === 'landing') {
    return <LandingPage onStartExploring={() => setCurrentView('workspace')} />;
  }

  if (currentView === 'token-page') {
    return (
      <div className="min-h-screen bg-[var(--color-surface-canvas)] text-[var(--color-neutral-900)]">
        <Header
          sessionTitle="Design System Token Viewer"
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          currentView={currentView}
          onNavigateView={(v) => setCurrentView(v)}
        />
        <div className="p-4">
          <ComponentReference />
        </div>
      </div>
    );
  }

  if (currentView === 'examples') {
    return (
      <div className="min-h-screen bg-[var(--color-surface-canvas)] text-[var(--color-neutral-900)]">
        <Header
          sessionTitle="Examples"
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          currentView={currentView}
          onNavigateView={(view) => setCurrentView(view)}
        />
        <div className="flex min-h-[calc(100vh-3.5rem)]">
          <Sidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={() => setCurrentView('new-session')}
            onClearConversation={handleClearConversation}
            currentView={currentView}
            onNavigateView={(view) => setCurrentView(view)}
            isOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
          <ExamplesPage onStartSession={() => setCurrentView('new-session')} />
        </div>
      </div>
    );
  }

  // Main workspace layout
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-surface-canvas)] text-[var(--color-neutral-900)] flex-col">
      {/* Global Header */}
      <Header
        sessionTitle={sessionTitle}
        onTitleChange={(newTitle) => {
          setSessionTitle(newTitle);
          setConversations((prev) =>
            prev.map((c) => (c.id === activeConversationId ? { ...c, title: newTitle } : c))
          );
        }}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        currentView={currentView}
        onNavigateView={(v) => setCurrentView(v)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={() => setCurrentView('new-session')}
          onClearConversation={handleClearConversation}
          currentView={currentView}
          onNavigateView={(v) => setCurrentView(v)}
          isOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* View Switcher */}
        {currentView === 'new-session' && (
          <NewSessionWizard
            onStartSession={handleStartSessionFromWizard}
            onCancel={() => setCurrentView('workspace')}
          />
        )}

        {currentView === 'sessions' && (
          <SessionsTable
            sessions={conversations}
            onSelectSession={(id) => {
              handleSelectConversation(id);
              setCurrentView('workspace');
            }}
            onNewSession={() => setCurrentView('new-session')}
          />
        )}

        {currentView === 'image-history' && (
          <ImageHistory
            images={imageHistory}
            onSelectImage={(image) => {
              handleSelectConversation(image.sessionId);
              setCurrentView('workspace');
            }}
            onNewSession={() => setCurrentView('new-session')}
          />
        )}

        {currentView === 'workspace' && (
          <ChatArea
            activeImage={activeImage}
            previousImage={previousImage}
            messages={messages}
            suggestedQuestions={suggestedQuestions}
            onUploadImage={handleUploadImage}
            onSendMessage={handleSendMessage}
            onUploadNextBestView={(file) => handleUploadImage(file)}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            errorMessage={errorMessage}
            onRetry={() => setErrorMessage('')}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
