// 🔧 useRouter 모킹
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// __mocks__/next/navigation.ts
export const useRouter = () => ({
  push: jest.fn(),
});
