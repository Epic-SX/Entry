import React from 'react';
import { render, screen } from '@testing-library/react';
import QueryProvider from '@/contexts/QueryProvider';


describe('QueryProvider', () => {
    it('should render children inside QueryClientProvider', () => {
        render(
            <QueryProvider>
                <div data-testid="child">Test child</div>
            </QueryProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
