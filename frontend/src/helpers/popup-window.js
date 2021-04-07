import { toParams, toQuery } from './url-utils';

class PopupWindow {
  constructor(id, url) {
    this.id = id;
    this.url = url;
    this.open();
    this.poll();
  }

  open() {
    const params = { height: screen.height, width: screen.width / 2 };
    this.window = window.open(this.url, this.id, toQuery(params, ','));
  }

  close() {
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise(resolve => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window;
          if (!popup || popup.closed !== false) {
            this.close();
            return;
          }

          if (
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return;
          }

          const params = toParams(popup.location.search.replace(/^\?/, ''));
          resolve(params);
          this.close();
        } catch (error) {
          // ignore cross origin
        }
      }, 500);
    });
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = null;
    }
  }

  then(...args) {
    return this.promise.then(...args);
  }

  catch(...args) {
    return this.promise.catch(...args);
  }
}

export default PopupWindow;
