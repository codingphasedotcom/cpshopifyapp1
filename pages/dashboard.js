import Head from 'next/head'
import Link from 'next/link'
import {Avatar, Badge, Page, Card, CalloutCard, EmptyState, Layout} from '@shopify/polaris';
import {Provider, TitleBar} from '@shopify/app-bridge-react';

export default function Home() {
    const primaryAction = {content: 'Foo', url: '/foo'};
    const secondaryActions = [{content: 'Bar', url: '/bar'}];
    const actionGroups = [{title: 'Baz', actions: [{content: 'Baz', url: '/baz'}]}];

  return (
    <Page>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleBar
        title="Dashboard"
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
        actionGroups={actionGroups}
      />
      <Layout>
        <Layout.Section>
          <Card>
            <p>This is the dashboard page</p>
          </Card>
        </Layout.Section>
        
      </Layout>
      
    </Page>
  )
}
