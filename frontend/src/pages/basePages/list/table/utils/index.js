import request from '@/api/upload';

export const upload = async (e, options) => {
  const { onSuccess, fileItem, name } = options;

  const uploadUrl = '';

  const reader = new FileReader();
  reader.onload = async (res) => {
    await request(uploadUrl, res.target.result);
    onSuccess(res);
  };
  reader.readAsArrayBuffer(fileItem.file);
};
