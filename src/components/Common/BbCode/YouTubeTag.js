import React from 'react';
import parser, { Tag } from 'bbcode-to-react';

class YoutubeTag extends Tag {
    toReact() {
        const attributes = {
            src: this.getContent(true),
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

parser.registerTag('youtube', YoutubeTag);
