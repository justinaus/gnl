import ErrorBoundary from '@components/shared/ErrorBoundary';
import { APP_MAX_WIDTH } from '@constants/*';
import { SwipeableDrawer } from '@mui/material';
import { Box } from '@mui/system';
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Option = {
  onClose?: () => void;
};

const DEFAULT_OPTION: Option = {
  onClose: undefined,
};

type PopupContextValues = {
  openPopup: (node: ReactNode, option?: Option) => void;
  closePopup: () => void;
};

const PopupContext = createContext<PopupContextValues | null>(null);

const iOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function PopupProvider({ children }: PropsWithChildren<{}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupChildren, setPopupChildren] = useState<ReactNode | null>(null);
  const [option, setOption] = useState<Option>(DEFAULT_OPTION);

  const openPopup = useCallback((popupNode: ReactNode, option?: Option) => {
    setPopupChildren(popupNode);

    setOption(option || DEFAULT_OPTION);

    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);

    setPopupChildren(null);
  }, []);

  useEffect(() => {
    function onPop() {
      setIsOpen(false);
    }
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  return (
    <>
      <PopupContext.Provider
        value={{ openPopup: openPopup, closePopup: closePopup }}
      >
        {children}
      </PopupContext.Provider>
      <ErrorBoundary>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          disableSwipeToOpen={true}
          anchor="bottom"
          open={isOpen}
          onClose={option.onClose || closePopup}
          onOpen={() => {}}
          PaperProps={{
            sx: {
              width: '100%',
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <Box
            sx={{
              margin: '0 auto',
              maxWidth: `${APP_MAX_WIDTH}px !important`,
              width: '100%',
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingY: 6,
              paddingX: 5,
            }}
          >
            {popupChildren}
          </Box>
        </SwipeableDrawer>
      </ErrorBoundary>
    </>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error('context must be provided');
  }

  return context;
}
