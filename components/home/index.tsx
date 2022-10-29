import { Paper, Title, Text, Group, Button } from '@mantine/core'
import Head from 'next/head'
import * as tf from '@tensorflow/tfjs'
import { DropImage } from '../DropImage'
import { useEffect, useState } from "react"
import CameraCapturer from '../CameraCapturer'

function useIsMobileDevice() {
    const [isMobileDevice, setIsMobileDevice] = useState(true)
    useEffect(() => {
        setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }, [])
    return isMobileDevice
}

const labels = ['Squash Powdery Mildew', 'Tomato Healthy', 'Tomato Septoria Leaf Spot']

export default function HomePage() {
    const isMobileDevice = useIsMobileDevice()
    const [imgSrc, setImgSrc] = useState<string>()
    const [file, setFile] = useState<File>()
    const [classifying, setClassifying] = useState(false)
    const [cameraIsOpen, setCameraIsOpen] = useState(false)
    const [prediction, setPrediction] = useState<{
        type: string
        confidence: number
    } | null>()

    async function handleDrop(files: File[]) {
        const file = files[0]
        if (!file) return
        setClassifying(true)
        setFile(file)
        setImgSrc(URL.createObjectURL(file))

        const img = document.createElement('img')
        img.width = 64
        img.height = 64
        img.src = URL.createObjectURL(file)

        predict(img)
    }

    const predictFromCamera = (dataUrl: string) => {
        setClassifying(true)
        const img = document.createElement('img')
        img.width = 64
        img.height = 64
        img.src = dataUrl
        setImgSrc(dataUrl)
        predict(img)
    }

    const predict = async (img: HTMLImageElement) => {
        const model = await tf.loadLayersModel('/tfjs_files/model.json')
        const imageTensor = tf.browser.fromPixels(img)
            .expandDims(0)
            .expandDims(-1)
            .div(255.0)
            .reshape([-1, 64, 64, 3])

        const pred: any = model.predict(imageTensor)
        const results = await pred.data()
        const confidence = Math.max(...results)
        const index = results.findIndex((r: any) => r === confidence)
        const type = labels[index]

        console.log(type, confidence)

        setPrediction({ confidence, type })
        setClassifying(false)
    }

    const openCamera = () => {
        if (!navigator || !navigator.mediaDevices) {
            alert('This feature is not supported on your browser')
            return
        }
        setCameraIsOpen(true)
    }

    return <>
        <Head> <title> Maladies Detection </title> </Head>

        <Title
            color={'lime'}
            size={'4rem'}
            p={'2rem 1rem 0'}
            align='center'>
            Plant <span style={{ color: 'crimson' }}> Doctor </span>
        </Title>
        <Text
            transform='capitalize'
            size={'xl'}
            align='center'>
            An outdoor plant maladies detection method based on real-time object detection
        </Text>

        <Group
            onClick={openCamera}
            align={'flex-end'}
            style={{ width: 'min(900px, 100%)' }}
            m={'2rem auto'}>
            <DropImage onDrop={handleDrop} imgsrc={imgSrc} loading={classifying} />
            <Button>
                Capture From Camera
            </Button>
        </Group>

        <CameraCapturer
            isMobileDevice={isMobileDevice}
            opened={cameraIsOpen}
            onCaptured={predictFromCamera}
            onClose={() => setCameraIsOpen(false)}
        />
    </>
}
