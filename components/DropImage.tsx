/* eslint-disable @next/next/no-img-element */
import { Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons'
import { Dropzone, DropzoneProps } from '@mantine/dropzone'

interface DropImageProps extends DropzoneProps {
    imgsrc: string | null
    loading: boolean
}

export function DropImage(props: Partial<DropImageProps>) {
    const theme = useMantineTheme()
    return (
        <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={['image/jpeg', 'image/png']}
            multiple={false}
            loading={props.loading}
            {...props}
        >
            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                <Dropzone.Accept>
                    <IconUpload
                        size={50}
                        stroke={1.5}
                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        size={50}
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Reject>
                {!props.imgsrc && <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                </Dropzone.Idle>}

                {
                    props.imgsrc ?
                        <Stack align={'center'}>
                            <img
                                id='image'
                                src={props.imgsrc}
                                alt="soil image"
                                style={{ objectFit: 'cover', width: '100%' }} />
                            <Text align='center'>  Click the image again to choose different one </Text>
                        </Stack>
                        : <div>
                            <Text size="xl" inline align='center'>
                                Click to select image from your device
                            </Text>
                            <Text size="sm" color="dimmed" inline mt={7} align='center'>
                                Each file should not exceed 5mb
                            </Text>
                        </div>
                }

            </Group>
        </Dropzone>
    )
}