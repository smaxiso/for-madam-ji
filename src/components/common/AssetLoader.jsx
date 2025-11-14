import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

/**
 * AssetLoader component to preload images and show loading progress
 */
function AssetLoader({ assets = [], onLoadComplete, children }) {
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (assets.length === 0) {
      setIsLoading(false);
      onLoadComplete?.();
      return;
    }

    let mounted = true;
    const promises = assets.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (mounted) {
            setLoadedAssets((prev) => prev + 1);
          }
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load asset: ${src}`);
          if (mounted) {
            setLoadedAssets((prev) => prev + 1);
          }
          reject(new Error(`Failed to load ${src}`));
        };
        img.src = src;
      });
    });

    Promise.all(promises)
      .then(() => {
        if (mounted) {
          setIsLoading(false);
          onLoadComplete?.();
        }
      })
      .catch((error) => {
        console.error('Asset loading error:', error);
        if (mounted) {
          setLoadError(error.message);
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [assets, onLoadComplete]);

  const progress = assets.length > 0 ? (loadedAssets / assets.length) * 100 : 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-peach flex items-center justify-center p-4">
        <motion.div
          {...fadeInUp}
          className="glass-medium rounded-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4"
          >
            💕
          </motion.div>
          <h2 className="text-2xl font-bold text-soft-rose mb-4">
            Loading magic...
          </h2>
          
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blush to-soft-rose"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <p className="text-sm text-muted-grey">
            {Math.round(progress)}% complete
          </p>
          
          {loadError && (
            <p className="text-xs text-soft-rose mt-2">
              Some assets failed to load, but we&apos;ll continue anyway!
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return children;
}

export default AssetLoader;
