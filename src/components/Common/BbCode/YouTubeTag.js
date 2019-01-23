import React from 'react';
import { Tag } from 'bbcode-to-react';
import parse from 'url-parse';

class YoutubeTag extends Tag {
    toReact() {
        let href = this.getContent(true);

        let { host } = parse(href, {});

        // Parse regular and shortened youtube URLs into the  youtube.com/embed/####### style so they work in browser and mobile
        if (host === "youtube.com" || host === "www.youtube.com" || host === "youtu.be") {
            if (host === "youtu.be") {
                href = href.replace("youtu.be/", "youtube.com/embed/");
            } else {
                href = href.replace("watch?v=", "embed/");
            }
            // disable autoplay
            href = href.replace("autoplay=", "no=");
        }

        const attributes = {
            src: href,
            width: this.params.width || 420,
            height: this.params.height || 315,
        };
        return (
            <iframe
                {...attributes}
                frameBorder="0"
                allowFullScreen
            />
        );
    }
}

export default YoutubeTag;
