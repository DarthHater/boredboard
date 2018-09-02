export const postHeler = {
    canEditPost
};

function canEditPost(post) {
    return (new Date().getMinutes() - new Date(post.PostedAt).getMinutes()) < 10;
}