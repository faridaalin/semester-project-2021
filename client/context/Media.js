import { createMedia } from '@artsy/fresnel';

const ExampleAppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 992,
    xl: 1200,
  },
});

// Generate CSS to be injected into the head
export const mediaStyle = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;
