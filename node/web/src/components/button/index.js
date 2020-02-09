import React from 'react';
import { Button, Spinner } from 'reactstrap';

export default function button({ children, loading, ...restProps }) {
  return (
    <Button {...restProps}>
      {loading ? <Spinner size="sm" color="light" /> : children}
    </Button>
  );
}
