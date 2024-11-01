import { useAlertStore } from '@/stores';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  const { hideAlert } = useAlertStore.getState();
  act(() => {
    hideAlert();
  });
});

describe('useAlertStore', () => {
  it('should initialize with the correct default state', () => {
    const state = useAlertStore.getState();
    expect(state.show).toBe(false);
    expect(state.title).toBe('');
    expect(state.type).toBe('info');
  });

  it('should show alert with the correct state', () => {
    const { showAlert } = useAlertStore.getState();
    act(() => {
      showAlert({
        title: 'Test Alert',
        type: 'warning',
        translationKey: 'test.key',
        rootTranslationKey: 'root.key',
      });
    });

    const state = useAlertStore.getState();
    expect(state.show).toBe(true);
    expect(state.title).toBe('Test Alert');
    expect(state.type).toBe('warning');
    expect(state.translationKey).toBe('test.key');
    expect(state.rootTranslationKey).toBe('root.key');
  });

  it('should hide alert and reset to initial state', () => {
    const { showAlert, hideAlert } = useAlertStore.getState();
    act(() => {
      showAlert({
        title: 'Test Alert',
        type: 'warning',
        translationKey: 'test.key',
        rootTranslationKey: 'root.key',
      });
    });

    act(() => {
      hideAlert();
    });

    const state = useAlertStore.getState();
    expect(state.show).toBe(false);
    expect(state.title).toBe('');
    expect(state.type).toBe('info');
  });
});
