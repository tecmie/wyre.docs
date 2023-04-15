import { Badge } from '@chakra-ui/react'
// import pkg from '../../../../packages/saas-ui-react/package.json'
// import proPkg from '../../../../packages/pro/saas-ui/pro/package.json'

export const Version = (props: { version?: string; pro?: boolean }) => {
  return (
    <Badge variant="outline" textTransform="none">
      {props.version || '2.0.0-next'}
    </Badge>
  )
}
