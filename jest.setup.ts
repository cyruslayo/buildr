import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { MessageChannel, MessagePort } from 'worker_threads';

global.TextEncoder = TextEncoder;
// @ts-expect-error TextDecoder types incompatible
global.TextDecoder = TextDecoder;
global.MessageChannel = MessageChannel as any;
global.MessagePort = MessagePort as any;

// Polyfill for ReadableStream
if (typeof global.ReadableStream === 'undefined') {
  const { ReadableStream } = require('stream/web');
  global.ReadableStream = ReadableStream;
}

// Polyfill for Request/Response/fetch
if (typeof global.Request === 'undefined') {
  const { Request, Response, Headers, fetch } = require('undici');
  global.Request = Request;
  global.Response = Response;
  global.Headers = Headers;
  global.fetch = fetch;
}

// Mock Framer Motion to avoid async animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');
  
  // Create a simple wrapper that just renders children
  const createMotionComponent = (type: string) => {
    return React.forwardRef(({ children, ...props }: any, ref: any) => {
      // Filter out framer-motion specific props
      const domProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => 
          !['initial', 'animate', 'exit', 'variants', 'transition', 'whileHover', 
           'whileTap', 'whileInView', 'viewport', 'custom', 'layout', 'layoutId',
           'onAnimationComplete', 'onAnimationStart'].includes(key)
        )
      );
      return React.createElement(type, { ...domProps, ref }, children);
    });
  };

  return {
    motion: {
      div: createMotionComponent('div'),
      span: createMotionComponent('span'),
      p: createMotionComponent('p'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      a: createMotionComponent('a'),
      button: createMotionComponent('button'),
      img: createMotionComponent('img'),
      section: createMotionComponent('section'),
      ul: createMotionComponent('ul'),
      li: createMotionComponent('li'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});
