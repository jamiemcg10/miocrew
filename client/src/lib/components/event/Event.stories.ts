import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { fn } from 'storybook/test'

import Event from './Event'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Event',
  component: Event,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Event>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TripEvent: Story = {
  args: {
    event: {
      id: 'wm1',
      name: 'Check into AirBnB and relax',
      description: 'Arrive, hang out at AirBnB until dinner',
      location: '132 Sonoma Crest Road Ext',
      startTime: new Date('August 5, 2026 2:00 PM'),
      endTime: new Date('August 5, 2026 6:00 PM'),
      color: 'orangered'
    }
  }
}
