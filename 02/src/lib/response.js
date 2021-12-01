module.exports = {
  get body() {
    return this._body;
  },
  set body(val) {
    if (val && typeof val === "object") {
      this._body = JSON.stringify(val);
    } else {
      this._body = String(val);
    }
  },
};
