import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatArea from './components/ChatArea.jsx';
import NewSessionWizard from './components/NewSessionWizard.jsx';
import SessionsTable from './components/SessionsTable.jsx';
import ComparisonViewer from './components/ComparisonViewer.jsx';
import LandingPage from './components/LandingPage.jsx';
import ComponentReference from './components/ComponentReference.jsx';
import { conversationApi, imageApi, chatApi } from './services/api/index.js';

function AppContent() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('workspace'); // 'workspace' | 'new-session' | 'sessions' | 'compare' | 'landing' | 'token-page'
  const [sessionTitle, setSessionTitle] = useState('Study Desk Setup');

  // Initialize conversations on mount
  useEffect(() => {
    async function initConversations() {
      try {
        const data = await conversationApi.getConversations();
        if (data && data.length > 0) {
          setConversations(data);
          setActiveConversationId(data[0].id);
          if (data[0].title) setSessionTitle(data[0].title);
          if (data[0].messages) setMessages(data[0].messages);
        } else {
          await handleNewConversation();
        }
      } catch (_err) {
        // Fallback local session if backend unreachable
        const fallbackId = `conv-${Date.now()}`;
        const fallbackConv = {
          id: fallbackId,
          title: 'Study Desk Setup',
          imageCount: '2 images',
          time: '10:32 AM',
          thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=120&q=80',
          created: new Date(),
        };
        setConversations([
          fallbackConv,
          {
            id: 'conv-sample-2',
            title: 'Lab Equipment',
            imageCount: '3 images',
            time: 'Oct 6',
            thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=120&q=80',
          },
          {
            id: 'conv-sample-3',
            title: 'Indoor Plants',
            imageCount: '1 image',
            time: 'Oct 5',
            thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=120&q=80',
          },
        ]);
        setActiveConversationId(fallbackId);
      }
    }
    initConversations();
  }, []);

  const handleNewConversation = async () => {
    try {
      const newConv = await conversationApi.createConversation();
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      setActiveImage(null);
      setPreviousImage(null);
      setMessages([]);
      setErrorMessage('');
      setSessionTitle(newConv.title || 'New Session');
    } catch (_err) {
      const localId = `conv-${Date.now()}`;
      const newConv = {
        id: localId,
        title: 'New Session',
        imageCount: '1 image',
        time: 'Just now',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=120&q=80',
        created: new Date(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(localId);
      setActiveImage(null);
      setPreviousImage(null);
      setMessages([]);
      setSessionTitle('New Session');
    }
  };

  const handleSelectConversation = async (id) => {
    setActiveConversationId(id);
    setErrorMessage('');
    const target = conversations.find((c) => c.id === id);
    if (target) setSessionTitle(target.title);

    try {
      const data = await conversationApi.getConversation(id);
      if (data && data.messages) setMessages(data.messages);
      if (data && data.activeImage) setActiveImage(data.activeImage);
    } catch (_err) {
      // Local fallback
    }
  };

  const handleClearConversation = async (id) => {
    try {
      await conversationApi.deleteConversation(id);
    } catch (_err) {
      // Fallback
    }
    const filtered = conversations.filter((c) => c.id !== id);
    setConversations(filtered);
    if (activeConversationId === id) {
      if (filtered.length > 0) {
        handleSelectConversation(filtered[0].id);
      } else {
        handleNewConversation();
      }
    }
  };

  const handleUploadImage = async (file) => {
    setIsLoading(true);
    setLoadingMessage('Uploading & validating image...');
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

      const uploadRes = await imageApi.uploadImage(file, activeConversationId).catch(() => null);
      if (uploadRes && uploadRes.imageId) {
        newImageData.id = uploadRes.imageId;
        newImageData.url = uploadRes.url;
      }

      if (activeImage) setPreviousImage(activeImage);
      setActiveImage(newImageData);

      const systemMessage = {
        role: 'assistant',
        content: `Uploaded image "${file.name}". You can now ask questions about this visual scene!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, systemMessage]);
    } catch (err) {
      setErrorMessage(err.message || 'Image upload failed. Please try again.');
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
    setLoadingMessage('Analyzing visual features & checking evidence...');

    try {
      const response = await chatApi
        .sendMessage({
          conversationId: activeConversationId,
          question,
          imageId: activeImage?.id,
          previousImageId: previousImage?.id,
        })
        .catch(() => null);

      if (response && response.answer) {
        const assistantMsg = {
          role: 'assistant',
          content: response.answer,
          evidence: response.evidence,
          visualEntities: response.visualEntities,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const mockResponse = generateMockAnswer(question, activeImage);
        setMessages((prev) => [...prev, mockResponse]);
      }
    } catch (err) {
      setErrorMessage(err.message || "SceneTrace couldn't analyze this image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartSessionFromWizard = (wizardData) => {
    handleNewConversation();
    if (wizardData.uploadedFile?.file) {
      handleUploadImage(wizardData.uploadedFile.file);
    }
    if (wizardData.question) {
      setTimeout(() => {
        handleSendMessage(wizardData.question);
      }, 500);
    }
    setCurrentView('workspace');
  };

  // Render Landing Page full width if currentView === 'landing'
  if (currentView === 'landing') {
    return <LandingPage onStartExploring={() => setCurrentView('workspace')} />;
  }

  // Render Component Token Reference if currentView === 'token-page'
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

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-surface-canvas)] text-[var(--color-neutral-900)] flex-col">
      {/* GLOBAL TOP HEADER BAR */}
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
        {/* SIDEBAR NAVIGATION */}
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

        {/* MAIN VIEW SWITCHER */}
        {currentView === 'new-session' && (
          <NewSessionWizard
            onStartSession={handleStartSessionFromWizard}
            onCancel={() => setCurrentView('workspace')}
          />
        )}

        {currentView === 'sessions' && (
          <SessionsTable
            onSelectSession={(id) => {
              handleSelectConversation(id);
              setCurrentView('workspace');
            }}
            onNewSession={() => setCurrentView('new-session')}
          />
        )}

        {currentView === 'compare' && (
          <ComparisonViewer
            previousImage={previousImage}
            activeImage={activeImage}
            onClose={() => setCurrentView('workspace')}
          />
        )}

        {currentView === 'workspace' && (
          <ChatArea
            activeImage={activeImage}
            previousImage={previousImage}
            messages={messages}
            onUploadImage={handleUploadImage}
            onSendMessage={handleSendMessage}
            onUploadNextBestView={(file) => handleUploadImage(file)}
            onCompareImages={() => setCurrentView('compare')}
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

function generateMockAnswer(question, activeImage) {
  return {
    role: 'assistant',
    content: `I've analyzed the visual scene in "${activeImage?.name || 'Study Desk Setup'}".`,
    items: [
      { id: 1, label: 'Laptop', color: '#1570ef', text: 'positioned centrally on the desk.' },
      { id: 2, label: 'Mug', color: '#d97706', text: 'white ceramic mug placed on the right.' },
      { id: 3, label: 'Notebook', color: '#e11d48', text: 'spiral notebook open with handwriting.' },
      { id: 4, label: 'Plant', color: '#059669', text: 'small indoor potted succulent.' },
    ],
    evidenceCrops: [
      { id: 1, thumb: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=80&q=80' },
      { id: 2, thumb: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=80&q=80' },
      { id: 3, thumb: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=80&q=80' },
      { id: 4, thumb: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=80&q=80' },
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
