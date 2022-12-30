export class UserInfo {
  constructor(userId, username, userJob, userAvatar) {
    this._userId = userId;
    this._username = username;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
  }

  getInfo() {
    return {
      id: this._userId,
      name: this._username,
      job: this._userJob,
      avatar: this._userAvatar,
    };
  }
}
