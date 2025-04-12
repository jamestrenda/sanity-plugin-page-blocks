import React, {useEffect, useState} from 'react'
import {Button, Card, Stack, Flex, Text, Box} from '@sanity/ui'
import {useClient} from 'sanity'
import {ObjectInputProps, ImageValue, ObjectSchemaType} from 'sanity'
import {EditIcon} from 'lucide-react'
import {useRouter} from 'sanity/router'

const LogoReferenceInput = (
  props: ObjectInputProps<ImageValue, ObjectSchemaType> & {query: string},
) => {
  const {renderDefault} = props
  const router = useRouter()
  const [settingsDoc, setSettingsDoc] = useState<{_id: string; logo?: ImageValue} | null>(null)
  const client = useClient({apiVersion: '2025-04-12'})
  const query = props.query || '*[_type == "settings"][0]{_id, logo}'

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
      // This uses the Sanity router to open a document in a side pane
      router.navigate({
        id: settingsDoc._id,
        // type: 'settings'
      })
    }
  }

  return (
    <Stack space={4}>
      <Card padding={4} border>
        <Stack space={4}>
          <Flex align="center" justify="space-between">
            <Text weight="semibold">Logo from Settings</Text>
            <Button
              icon={EditIcon}
              text="Edit in Settings"
              onClick={openSettingsDocument}
              tone="primary"
              mode="ghost"
              disabled={!settingsDoc}
            />
          </Flex>

          {/* Show the settings logo as preview */}
          {/* {settingsDoc?.logo && (
            <Box>
              <img
                src={client.image(settingsDoc.logo).width(300).url()}
                alt="Logo from settings"
                style={{maxWidth: '100%'}}
              />
            </Box>
          )} */}

          <Text size={1} muted>
            This logo is managed in the Settings document. Click the button above to edit it.
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}

export default LogoReferenceInput
