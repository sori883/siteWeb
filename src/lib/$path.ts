export const pagesPath = {
  account: {
    forgot: {
      $url: (url?: { hash?: string }) => ({ pathname: '/account/forgot' as const, hash: url?.hash })
    },
    login: {
      $url: (url?: { hash?: string }) => ({ pathname: '/account/login' as const, hash: url?.hash })
    },
    regist: {
      $url: (url?: { hash?: string }) => ({ pathname: '/account/regist' as const, hash: url?.hash })
    },
    reset: {
      _token: (token: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/account/reset/[token]' as const, query: { token }, hash: url?.hash })
      })
    },
    verify: {
      _token: (token: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/account/verify/[token]' as const, query: { token }, hash: url?.hash })
      })
    }
  },
  article: {
    edit: {
      $url: (url?: { hash?: string }) => ({ pathname: '/article/edit' as const, hash: url?.hash })
    },
    post: {
      $url: (url?: { hash?: string }) => ({ pathname: '/article/post' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/article' as const, hash: url?.hash })
  },
  category: {
    $url: (url?: { hash?: string }) => ({ pathname: '/category' as const, hash: url?.hash })
  },
  tag: {
    $url: (url?: { hash?: string }) => ({ pathname: '/tag' as const, hash: url?.hash })
  },
  user: {
    home: {
      $url: (url?: { hash?: string }) => ({ pathname: '/user/home' as const, hash: url?.hash })
    }
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
