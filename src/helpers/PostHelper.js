export function canEditPost(post) {
    let milliseconds = new Date().getTime() - new Date(post.PostedAt).getTime();
    return (milliseconds / 60000) < config.get('EDIT_POST_TIME');
}

