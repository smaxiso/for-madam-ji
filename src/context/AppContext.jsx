import { createContext, useContext, useReducer, useEffect } from 'react';
import { slidesData } from '../data/slides';

// Create the context
const AppContext = createContext();

// Action types
export const ACTION_TYPES = {
  // Navigation
  NEXT_SLIDE: 'NEXT_SLIDE',
  PREV_SLIDE: 'PREV_SLIDE',
  GO_TO_SLIDE: 'GO_TO_SLIDE',
  
  // Audio
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  SET_AUDIO_PLAYING: 'SET_AUDIO_PLAYING',
  
  // UI Controls
  TOGGLE_CONTROLS: 'TOGGLE_CONTROLS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  
  // Game State
  UPDATE_GAME_STATE: 'UPDATE_GAME_STATE',
  RESET_GAME_STATE: 'RESET_GAME_STATE',
  
  // Gifts
  REVEAL_GIFT: 'REVEAL_GIFT',
  RESET_GIFTS: 'RESET_GIFTS',
  
  // Modal
  TOGGLE_MODAL: 'TOGGLE_MODAL',
};

// Initial state
const initialState = {
  // Navigation
  currentSlide: 0,
  totalSlides: slidesData.length,
  direction: 1, // 1 for forward, -1 for backward
  
  // Audio
  isAudioPlaying: false,
  audioEnabled: true,
  
  // UI Controls
  showControls: true,
  isLoading: false,
  error: null,
  
  // Game State (for Tic-Tac-Toe)
  gameState: {
    board: Array(9).fill(null),
    isPlayerTurn: true,
    winner: null,
    winningLine: null,
  },
  
  // Gifts State
  gifts: {
    revealed: [],
    currentGift: 0,
  },
  
  // Modal State
  isModalOpen: false,
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.NEXT_SLIDE:
      if (state.currentSlide < state.totalSlides - 1) {
        return {
          ...state,
          currentSlide: state.currentSlide + 1,
          direction: 1,
        };
      }
      return state;
      
    case ACTION_TYPES.PREV_SLIDE:
      if (state.currentSlide > 0) {
        return {
          ...state,
          currentSlide: state.currentSlide - 1,
          direction: -1,
        };
      }
      return state;
      
    case ACTION_TYPES.GO_TO_SLIDE:
      if (action.payload >= 0 && action.payload < state.totalSlides) {
        return {
          ...state,
          currentSlide: action.payload,
          direction: action.payload > state.currentSlide ? 1 : -1,
        };
      }
      return state;
      
    case ACTION_TYPES.TOGGLE_AUDIO:
      return {
        ...state,
        isAudioPlaying: !state.isAudioPlaying,
      };
      
    case ACTION_TYPES.SET_AUDIO_PLAYING:
      return {
        ...state,
        isAudioPlaying: action.payload,
      };
      
    case ACTION_TYPES.TOGGLE_CONTROLS:
      return {
        ...state,
        showControls: !state.showControls,
      };
      
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
      
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      
    case ACTION_TYPES.UPDATE_GAME_STATE:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          ...action.payload,
        },
      };
      
    case ACTION_TYPES.RESET_GAME_STATE:
      return {
        ...state,
        gameState: {
          board: Array(9).fill(null),
          isPlayerTurn: true,
          winner: null,
          winningLine: null,
        },
      };
      
    case ACTION_TYPES.REVEAL_GIFT:
      if (!state.gifts.revealed.includes(action.payload)) {
        return {
          ...state,
          gifts: {
            ...state.gifts,
            revealed: [...state.gifts.revealed, action.payload],
            currentGift: action.payload,
          },
        };
      }
      return state;
      
    case ACTION_TYPES.RESET_GIFTS:
      return {
        ...state,
        gifts: {
          revealed: [],
          currentGift: 0,
        },
      };
      
    case ACTION_TYPES.TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
      
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Save current slide to localStorage
  useEffect(() => {
    localStorage.setItem('currentSlide', state.currentSlide.toString());
  }, [state.currentSlide]);
  
  // Load saved slide on mount
  useEffect(() => {
    const savedSlide = localStorage.getItem('currentSlide');
    if (savedSlide) {
      const slideIndex = parseInt(savedSlide, 10);
      if (slideIndex >= 0 && slideIndex < state.totalSlides) {
        dispatch({ type: ACTION_TYPES.GO_TO_SLIDE, payload: slideIndex });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Provide state and dispatch
  const value = {
    state,
    dispatch,
    // Convenience getters
    currentSlide: slidesData[state.currentSlide],
    slideIndex: state.currentSlide,
    isFirstSlide: state.currentSlide === 0,
    isLastSlide: state.currentSlide === state.totalSlides - 1,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
