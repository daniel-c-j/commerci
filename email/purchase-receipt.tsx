import { Order } from "@/types";
import React from "react";
import { Body, Column, Container, Head, Heading, Html, Preview, Row, Section, Tailwind, Text } from "@react-email/components"
import { nullish } from "zod";

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

export default function PurchaseReceiptEmail({ order }: { order: Order }) {
  return <Html>
    <Preview>
      View order receipt
    </Preview>
    <Tailwind>
      <Head />
      <Body className="font-sans bg-white">
        <Container className="max-w-xl">
          <Heading>Purchase Receipt</Heading>
          <Section>
            <Row>
              <Column>
                <Text className="mt-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                  Purchase Date
                </Text>

                <Text className="mt-0"></Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>

    </Tailwind>
  </Html>
}
