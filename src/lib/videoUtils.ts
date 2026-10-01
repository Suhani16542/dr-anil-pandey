/**
 * Utility functions for handling YouTube, Vimeo, and custom video URLs
 */

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Standard full youtube urls, short urls, embeds, shorts
  const patterns = [
    /(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/)([^#&?]*).*/,
    /[?&]v=([^#&?]*)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }

  // Handle direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
}

export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:vimeo\.com\/|video\/)(\d+)/);
  return match && match[1] ? match[1] : null;
}

export function getEmbedUrl(url: string): { type: "youtube" | "vimeo" | "direct" | "iframe"; embedUrl: string } {
  if (!url) {
    return { type: "direct", embedUrl: "" };
  }

  const ytId = extractYouTubeId(url);
  if (ytId) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`,
    };
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
    };
  }

  if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) {
    return {
      type: "direct",
      embedUrl: url,
    };
  }

  return {
    type: "iframe",
    embedUrl: url,
  };
}

export function getVideoThumbnail(url: string, customThumbnail?: string): string {
  if (customThumbnail && customThumbnail.trim().length > 0) {
    return customThumbnail;
  }

  const ytId = extractYouTubeId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }

  return "https://images.unsplash.com/photo-1576091160291-237466810a4f?auto=format&fit=crop&w=1200&q=85";
}
