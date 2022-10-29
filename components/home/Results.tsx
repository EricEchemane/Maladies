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
            {prediction.type === "Tomato Healthy" && <>
                <Title> Your Tomato Plant Is Healthy. Great Job! </Title>
            </>}
            {prediction.type === "Tomato Septoria Leaf Spot" && <Stack>
                <Title> Tomato Septoria Leaf Spot </Title>
                <Text> {septoria.descriptions.map(description => (
                    <p key={description}> {description} </p>
                ))} </Text>
                <Title order={3}> Treatments </Title>
                <ul> {septoria.treatments.map(treatment => (
                    <li key={treatment} style={{ marginBottom: '.5rem' }}> {treatment} </li>
                ))} </ul>
                <Title order={3}> Methods </Title>
                <ul> {septoria.methods.map(method => (
                    <li key={method} style={{ marginBottom: '.5rem' }}> {method} </li>
                ))} </ul>
            </Stack>}
            {prediction.type === "Squash Powdery Mildew" && <Stack>
                <Title> Squash Powdery Mildew </Title>
                <Text> {powdery.descriptions.map(description => (
                    <p key={description}> {description} </p>
                ))} </Text>
                <Title order={3}> Treatments </Title>
                <ul> {powdery.treatments.map(treatment => (
                    <li key={treatment} style={{ marginBottom: '.5rem' }}> {treatment} </li>
                ))} </ul>
                <Title order={3}> Ingredients </Title>
                <ul> {powdery.ingredients.map(ingredient => (
                    <li key={ingredient} style={{ marginBottom: '.5rem' }}> {ingredient} </li>
                ))} </ul>
                <Title order={3}> Methods </Title>
                <ul> {powdery.methods.map(method => (
                    <li key={method} style={{ marginBottom: '.5rem' }}> {method} </li>
                ))} </ul>
            </Stack>}
        </Stack>
    </>
}