import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({

   projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
   dataset: 'produnction',
   apiVersion: '2022-1-4',
   useCdn: true,
   token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const url = (source) => builder.image(source)