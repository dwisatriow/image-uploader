import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export default function Notification({
  type,
  description,
}: {
  type: string
  description: string
}) {
  return (
    <Alert
      className='w-[356px]'
      variant={type === 'error' ? 'destructive' : 'default'}
    >
      {type === 'success' ? (
        <CheckCircledIcon className='my-auto h-4 w-4' />
      ) : type === 'warning' ? (
        <ExclamationTriangleIcon className='my-auto h-4 w-4' />
      ) : type === 'error' ? (
        <ExclamationTriangleIcon className='my-auto h-4 w-4' />
      ) : null}
      <AlertTitle>
        {type === 'success'
          ? 'Success'
          : type === 'warning'
            ? 'Warning'
            : type === 'error'
              ? 'Error'
              : ''}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
