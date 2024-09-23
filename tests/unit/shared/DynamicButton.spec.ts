import { mount } from '@vue/test-utils';
import DynamicButton from '@/components/DynamicButton.vue';

describe('DynamicButton.vue', () => {
  test('renders button with correct label', () => {
    const wrapper = mount(DynamicButton, {
      props: {
        label: 'Click me',
      },
    });

    expect(wrapper.text()).toBe('Click me');
  });

  test('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(DynamicButton, {
      props: {
        label: 'Click me',
        isDisabled: false,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  test('does not emit click event when disabled', async () => {
    const wrapper = mount(DynamicButton, {
      props: {
        label: 'Click me',
        isDisabled: true,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
  });

  test('applies customClass and hoverClass when provided', () => {
    const wrapper = mount(DynamicButton, {
      props: {
        label: 'Click me',
        customClass: 'bg-red-500',
        hoverClass: 'hover:bg-green-500',
      },
    });

    expect(wrapper.classes()).toContain('bg-red-500');
    expect(wrapper.classes()).toContain('hover:bg-green-500');
  });

  test('applies disabled class when isDisabled is true', () => {
    const wrapper = mount(DynamicButton, {
      props: {
        label: 'Click me',
        isDisabled: true,
      },
    });

    expect(wrapper.classes()).toContain('cursor-not-allowed');
    expect(wrapper.classes()).toContain('bg-gray-400');
  });
});
