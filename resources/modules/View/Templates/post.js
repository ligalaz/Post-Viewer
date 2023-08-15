export default function postTemplate(postList) {
  return `${postList.map(
    (
      item,
      idx,
    ) => `<div id=${item.id} userId=${item.userId} class="post main__post">
            <div class="title__container">
              <p class="title post__title">${item.title}</p>
            </div>
            <p class="text post__text">${item.editBody}

            </p>
            <div class="info post_info">
              <div class="spectators post__spectators">
                <div class="spectators__logo">
                  <img
                    src="./resources/icons/settings/monitor.png"
                    alt="spectators"
                  />
                </div>
                <div class="spectators__number">${item.reactions}</div>
              </div>
              <div class="author post__author">userId№  ${item.userId}</div>
            </div>
          </div>`,
  ).join``}`;
}
