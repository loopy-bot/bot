import { Notification } from '@arco-design/web-vue';
import Clipboard from 'clipboard';

export default function handleClipboard(text: string, event: any) {
  const clipboard: any = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on('success', () => {
    Notification.success('复制成功');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    Notification.error('复制失败');
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
