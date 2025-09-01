export default {
  name: 'testimonial',
  title: 'Guest Testimonial',
  type: 'document',
  fields: [
    {
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Guest Location',
      type: 'string'
    },
    {
      name: 'review',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [
          {title: '5 Stars', value: 5},
          {title: '4 Stars', value: 4},
          {title: '3 Stars', value: 3},
          {title: '2 Stars', value: 2},
          {title: '1 Star', value: 1}
        ]
      },
      initialValue: 5,
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    }
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
}