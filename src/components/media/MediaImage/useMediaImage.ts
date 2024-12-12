import { useState, useEffect } from 'react';
import { MediaType } from '../../../types/media';
import { getImageUrl, preloadImage } from '../../../utils/images';

export function useMediaImage(src: string | null, type: MediaType) {
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    imageUrl: getImageUrl(src, type)
  });

  useEffect(() => {
    let mounted = true;
    const imageUrl = getImageUrl(src, type);

    async function loadImage() {
      if (!src) {
        setState({
          isLoading: false,
          hasError: true,
          imageUrl: getImageUrl(null, type)
        });
        return;
      }

      try {
        setState(prev => ({ ...prev, isLoading: true, hasError: false }));
        await preloadImage(imageUrl);
        
        if (mounted) {
          setState({
            isLoading: false,
            hasError: false,
            imageUrl
          });
        }
      } catch (err) {
        if (mounted) {
          setState({
            isLoading: false,
            hasError: true,
            imageUrl: getImageUrl(null, type)
          });
        }
      }
    }

    loadImage();

    return () => {
      mounted = false;
    };
  }, [src, type]);

  return state;
}