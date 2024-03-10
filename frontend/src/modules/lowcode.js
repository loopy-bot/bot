import formCreate from '@form-create/arco-design';
import FcDesigner from '@form-create/designer';

export default (app) => {
  app.use(formCreate);
  app.use(FcDesigner);
};
