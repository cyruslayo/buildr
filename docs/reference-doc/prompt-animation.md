---
title: Animation Prompting | Aura Design Learning Center
source: https://www.aura.build/learn/prompt-for-animation
---

Well-crafted animation prompts can significantly improve user experience by guiding attention, providing feedback, and adding character to your interfaces.

## Introduction to Animation

Effective animations provide context, guidance, and feedback to users, making interfaces more intuitive and engaging. When crafting prompts for animations, consider:

1. Purpose of the animation

Is it to draw attention, show state change, provide feedback, or guide users through a process?

2. Animation properties

Duration, timing function, delay, and intensity all affect the feel of the animation.

3. Trigger events

What causes the animation to start? Page load, user interaction, scroll position, or state changes?

4. User experience considerations

Respect user preferences with reduced motion options, and ensure animations enhance rather than distract.

## Animated hero section made in Aura

## Text Animation

Text animations can make your content more engaging and highlight important information. Here are various text animation techniques:

### Pro Tip: Text Animation Considerations

Keep text animations subtle and brief to avoid distracting users from your content. Ensure animated text remains readable throughout the animation. For longer texts, animate only headings or key phrases rather than entire paragraphs.

## Card Animation

Card animations add depth and interactivity to your UI, helping users understand interactions and hierarchy. Here are common card animation patterns:

### Card Animation Best Practices

Keep animations subtle and brief (under 300ms) for hover effects. Ensure accessibility by not relying solely on hover for critical actions. Use hardware-accelerated properties like transform and opacity for smoother animations.

## Button Animation

Interactive button animations provide critical feedback to users and enhance the feeling of responsiveness. Here are various button animation techniques:

### Button Animation Best Practices

Keep animations quick (under 300ms) to maintain perceived performance. Provide immediate visual feedback on click/tap. Ensure animations don't delay the actual functionality or form submission. For loading states, keep users informed about progress to reduce perceived wait time.

## Intro animation made in Aura

## Alert Animation

Alert animations help draw attention to important messages and provide feedback to users. Effective alert animations are noticeable without being disruptive:

### Alert Animation Best Practices

Match animation style to the alert's importance (subtle for information, more noticeable for warnings/errors). Use auto-dismiss for non-critical alerts, but keep error messages visible until acknowledged. Provide a visual or accessible indicator of the remaining time for auto-dismissing alerts. Ensure alerts are accessible to screen readers by using appropriate ARIA roles and attributes.

## Animation Timing

Timing functions and duration choices can dramatically affect how animations feel. The right timing creates natural, pleasing motion that enhances user experience:

### Animation Timing Best Practices

Match the timing function to the animation's purpose. Use shorter durations for small elements and micro-interactions. Consider user expectation - important actions should feel responsive, not delayed. Test animations on both fast and slow devices to ensure performance. For complex animations, use easing functions that feel natural rather than mechanical.

## Animated card made in Aura

## Animation Examples

Visual examples of common animation patterns you can implement with CSS:

### Basic Animation Patterns

Note: These examples demonstrate common animation patterns using CSS keyframes with different timing functions.

### Animation Performance Tips

For optimal performance, animate only transform and opacity properties when possible. These properties can be hardware-accelerated and don't trigger layout recalculations. Avoid animating properties like width, height, or margin that cause layout reflows.

## Animation Prompt Builder

Build effective animation prompts by customizing key parameters below. This tool helps you generate clear, detailed instructions for creating animations.

### Animation Type

Duration: 800ms

FastMediumSlow

### Easing Function

### Iterations

### Direction

Intensity: 0 to 1

SubtleMediumStrong

### Live Preview

### Generated Prompt

Create a fade in animation for all elements on the page that transitions from opacity 0 to 1 over 800ms with ease-in-out timing function and a 0ms delay

### Prompt Builder Tips

Be specific about what elements should animate. Combine animation types for more complex effects. Consider the context and purpose of the animation when selecting parameters. Adjust the settings to match the desired attention level and impact.

## Example Animation Prompts

Use these example prompts as starting points for your own animation requests. These examples cover various common animation scenarios:

### Hero Section Entrance

Create a staggered entrance animation for the hero section where the heading fades in and slides up from 20px below, followed by the subheading 200ms later, and finally the CTA button 300ms after that. Use an ease-out timing function with a 600ms duration.

fade inslide upstaggeredease-out

### Page Transition

Create a smooth page transition effect where the current page fades out while sliding slightly to the left (transform: translateX(-20px)), and the new page fades in while sliding from the right (transform: translateX(20px) to 0). Use a 350ms duration with ease-in-out timing.

fadeslidepage transition

### Interactive Button Animation

Add a multi-state animation to call-to-action buttons where on hover, the button scales to 1.03x with a subtle shadow increase (box-shadow: 0 4px 12px rgba(0,0,0,0.1)), and on click, it scales down to 0.98x momentarily before returning to hover state. Use a quick 150ms duration for click and 200ms for hover with ease timing.

scalehoverclickmulti-state

### Loading Animation

Create a loading animation using three dots that fade and scale in sequence. Each dot should scale from 0.5 to 1.2 and back while fading from 0.2 to 1 opacity, with a 200ms delay between each dot. The animation should loop infinitely to indicate ongoing loading.

loadingscalefadeinfinite

### Card Hover Effects

Add hover animations to feature cards where the card subtly elevates (transform: translateY(-5px)) with an increased shadow, while the icon within the card scales up to 1.1x and changes color. The card background should also have a subtle gradient shift effect. Implement with a 300ms transition using ease-out timing.

hovermulti-propertytranslategradient

### Scroll-Triggered Animations

Implement scroll-triggered animations for content sections where elements slide in from different directions as they enter the viewport. Left side content should slide in from left (-30px), right side content from right (30px), and center content should fade in while moving up from 20px below. Use Intersection Observer with a 0.1 threshold and 600ms animation duration.

scrollslidefadedirectional

### Customizing Example Prompts

Use these examples as templates, adapting the specific values, timing, and properties to match your project needs. Combine elements from different examples to create complex animation systems. Always consider performance impact and accessibility when implementing animations.