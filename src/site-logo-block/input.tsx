import {Box, Button, Card, Flex, Spinner, Stack} from '@sanity/ui'
import {EditIcon} from 'lucide-react'
import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {Subscription} from 'rxjs'
import {SanityDefaultPreview, useClient, useSchema} from 'sanity'
import {ImageValue, ObjectInputProps, ObjectSchemaType} from 'sanity'
import {useRouter, useRouterState} from 'sanity/router'
import {RouterPanes} from 'sanity/structure'

import {apiVersion} from '../lib/api'

const LoadingIndicator = () => {
  return (
    <Flex justify={'center'} align={'center'} padding={4}>
      <Spinner />
    </Flex>
  )
}

const LogoReferenceInput = (
  props: ObjectInputProps<ImageValue, ObjectSchemaType> & {
    query?: string
    params?: Record<string, unknown>
  },
) => {
  const {params: userParams} = props

  // * Initialize the Studio client
  const client = useClient({apiVersion}).withConfig({
    perspective: 'drafts',
  })

  // * Initialize the router and get the pane groups
  const {navigate} = useRouter()
  const routerState = useRouterState()

  const routerPaneGroups = useMemo<RouterPanes>(
    () => (routerState?.panes || []) as RouterPanes,
    [routerState?.panes],
  )
  const [loading, setLoading] = useState(true)
  const [settingsDoc, setSettingsDoc] = useState<{_id: string; logo?: ImageValue} | null>(null)
  const query = props.query || '*[_type == "settings"][0]{_id, logo}'

  const schemaType = useSchema().get('siteLogoBlock')

  useEffect(() => {
    let subscription: Subscription
    const listen = () => {
      subscription = client
        .listen(query, {
          visibility: 'query',
          tag: `site-logo-${props.id}`,
          includeResult: false,
        })
        .subscribe(() =>
          client.fetch(query).then((data) => {
            setSettingsDoc(data)
            setLoading(false)
          }),
        )
    }
    client
      .fetch(query)
      .then((data) => {
        setSettingsDoc(data)
        setLoading(false)
      })
      .then(listen)
      .finally(() => setLoading(false))

    return function cleanup() {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  // Fetch the settings document info
  useEffect(() => {
    client
      .fetch<{_id: string; logo?: ImageValue} | null>(query)
      .then((settings) => {
        if (settings) {
          setSettingsDoc(settings)
        }
      })
      .catch(console.error)
  }, [])

  // Function to open the settings document in a side pane
  const openSettingsDocument = () => {
    if (settingsDoc?._id) {
      const nextPanes: RouterPanes = [
        // keep existing panes
        ...routerPaneGroups,
        [
          {
            id: settingsDoc._id,
            params: {
              type: settingsDoc._id,
              ...userParams,
            },
          },
        ],
      ]

      navigate({
        panes: nextPanes,
      })
    }
  }

  if (loading) return <LoadingIndicator />

  return (
    <Stack space={4}>
      <Card padding={4} border>
        <Stack space={4}>
          <Flex align="center" justify="space-between">
            {settingsDoc?.logo && (
              <Box>
                <SanityDefaultPreview
                  title="Site Logo"
                  schemaType={schemaType}
                  media={settingsDoc.logo.asset as ReactNode}
                />
              </Box>
            )}
            <Button
              icon={() => <EditIcon size="1em" />}
              text="Edit in Settings"
              onClick={openSettingsDocument}
              mode="ghost"
              disabled={!settingsDoc}
            />
          </Flex>
        </Stack>
      </Card>
    </Stack>
  )
}

export default LogoReferenceInput
