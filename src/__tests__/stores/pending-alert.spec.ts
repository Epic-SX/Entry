import { usePendingAlertStore } from '@/stores';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  const { hideAlert } = usePendingAlertStore.getState();
  act(() => {
    hideAlert();
  });
});

describe('usePendingAlertStore', () => {
  it('should initialize with the correct default state', () => {
    const state = usePendingAlertStore.getState();
    expect(state.show).toBe(false);
  });

  it('should show alert with the correct state', () => {
    const { showAlert } = usePendingAlertStore.getState();
    act(() => {
      showAlert();
    });

    const state = usePendingAlertStore.getState();
    expect(state.show).toBe(true);
  });

  it('should hide alert and reset to initial state', () => {
    const { showAlert, hideAlert } = usePendingAlertStore.getState();
    act(() => {
      showAlert();
    });

    act(() => {
      hideAlert();
    });

    const state = usePendingAlertStore.getState();
    expect(state.show).toBe(false);
  });
});
