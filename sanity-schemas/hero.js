export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Hero Type',
      type: 'string',
      options: {
        list: [
          {title: 'Video', value: 'video'},
          {title: 'Image', value: 'image'}
        ]
      },
      initialValue: 'video'
    },
    {
      name: 'videoSource',
      title: 'Video Source URL',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'video'
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      hidden: ({parent}) => parent?.type !== 'image'
    },
    {
      name: 'fallbackImage',
      title: 'Fallback Image (for video)',
      type: 'image',
      options: {
        hotspot: true
      },
      hidden: ({parent}) => parent?.type !== 'video'
    }
  ]
}