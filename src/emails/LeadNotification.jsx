import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

/**
 * The internal notification for one contact enquiry.
 *
 * Deliberately plain: one heading, one table, no images, no logo, no buttons,
 * no tracking pixel and no links at all. Nobody outside the company reads it,
 * and every decoration is another thing for a filter to weigh. Styles are
 * inline because email clients discard stylesheets.
 *
 * @param {{ rows: { label: string, value: string }[], intro: string, preview: string }} props
 */
export function LeadNotification({ rows, intro, preview }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading as="h1" style={heading}>
            New enquiry
          </Heading>

          <Text style={paragraph}>{intro}</Text>

          <Section>
            <table style={table} cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" style={labelCell}>
                      {row.label}
                    </th>
                    <td style={valueCell}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Text style={footnote}>Reply to this email to answer the sender directly.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadNotification;

const body = {
  backgroundColor: "#ffffff",
  color: "#16213f",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const container = { margin: "0 auto", padding: "24px", maxWidth: "600px" };

const heading = { fontSize: "20px", fontWeight: "600", margin: "0 0 12px" };

const paragraph = { fontSize: "15px", lineHeight: "1.6", margin: "0 0 20px" };

const table = { width: "100%", borderCollapse: "collapse" };

const labelCell = {
  textAlign: "left",
  verticalAlign: "top",
  width: "34%",
  padding: "10px 12px 10px 0",
  borderBottom: "1px solid #e4e1d7",
  fontSize: "14px",
  fontWeight: "600",
  color: "#4d5772",
};

const valueCell = {
  textAlign: "left",
  verticalAlign: "top",
  padding: "10px 0",
  borderBottom: "1px solid #e4e1d7",
  fontSize: "14px",
  color: "#16213f",
};

const footnote = { fontSize: "13px", color: "#4d5772", margin: "20px 0 0" };
