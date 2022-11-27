import type { AppType } from 'next/app';
import { trpc } from '../uttils/trpc';
const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);