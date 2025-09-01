import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity-schemas'

export default defineConfig({
  name: 'property-template',
  title: 'Property Template CMS',

  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  
  document: {
    // Prevent creating multiple instances of singleton documents
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => 
            !['property', 'hero', 'bookingLinks', 'virtualTour', 'socialMedia'].includes(templateItem.templateId)
        )
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      // Prevent deleting singleton documents
      if (['property', 'hero', 'bookingLinks', 'virtualTour', 'socialMedia'].includes(schemaType)) {
        return prev.filter(({action}) => action !== 'delete')
      }
      return prev
    }
  }
})