import { CSSProperties, MediaHTMLAttributes, useEffect, useRef } from 'react';
import FlvJs from 'flv.js';

interface LiveVideoProps
  extends Omit<MediaHTMLAttributes<HTMLVideoElement>, 'onError'> {
  className?: string;
  style: CSSProperties;
  // websocket 服务地址
  wsUrl: string;
  // 支持 rtsp 格式流地址
  videoUrl: string;
  flvConfig?: FlvJs.Config;
  onError?: (e: string) => void;
}

function LiveVideo({
  className,
  style,
  controls = true,
  autoPlay = true,
  muted = false,
  wsUrl = '',
  videoUrl = '',
  flvConfig = {},
  onError,
  ...props
}: LiveVideoProps) {
  const playerRef = useRef<FlvJs.Player>();
  const playerDomRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 如果浏览器支持flvjs，则执行相应的程序
    if (FlvJs.isSupported()) {
      const modifiedWsUrl = wsUrl.endsWith('/') ? wsUrl : wsUrl + '/';
      // 准备监控设备流地址
      playerRef.current = FlvJs.createPlayer({
        type: 'flv',
        isLive: true,
        url: modifiedWsUrl + videoUrl,
        ...flvConfig,
      });

      playerRef.current.on('error', error => {
        console.log(error);
        onError?.(error);
      });

      // 将实例挂载到video元素上面
      playerDomRef.current &&
        playerRef.current.attachMediaElement(playerDomRef.current);

      try {
        // 开始运行加载 只要流地址正常 就可以在h5页面中播放出画面了
        playerRef.current.load();
        playerRef.current.play();
      } catch (error) {
        console.log(error);
      }
    }
  });
  return (
    <video
      style={style}
      className={className}
      muted={muted}
      autoPlay={autoPlay}
      controls={controls}
      ref={playerDomRef}
      {...props}
    />
  );
}

export default LiveVideo;
