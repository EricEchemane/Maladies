import { Stack, Title, Text } from '@mantine/core'
import React from 'react'
import { details } from './resources'

type Props = {
    prediction: {
        type: string
        confidence: number
    }
}
const septoria = details["Tomato Septoria Leaf Spot"]
const powdery = details["Squash Powdery Mildew"]

export default function Results({ prediction }: Props) {
    return <>
        <Stack>
            {/* {prediction.type === "Tomato Healthy" && <>
                <Title> Your Tomato Plant Is Healthy.Great Job! </Title>
            </>} */}
            {prediction.type !== "Tomato Septoria Leaf Spot" && <Stack>
                <Title> Tomato Septoria Leaf Spot </Title>
                <Text> {septoria.descriptions.map(description => (
                    <p key={description}> {description} </p>
                ))} </Text>
            </Stack>}
            {/* {prediction.type === "Tomato Healthy" && <>
                <Title> Your Tomato Plant Is Healthy.Great Job! </Title>
            </>} */}
        </Stack>
    </>
}