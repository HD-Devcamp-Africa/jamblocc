
import React from 'react';
import ArticleCard from './ArticleCard';

const ThirdwebResources: React.FC = () => {
    return (
        <div className="grid gap-4 lg:grid-cols-3 justify-center">
            <ArticleCard
                title="thirdweb SDK Docs"
                href="https://portal.thirdweb.com/typescript/v5"
                description="thirdweb TypeScript SDK documentation"
            />

            <ArticleCard
                title="Components and Hooks"
                href="https://portal.thirdweb.com/typescript/v5/react"
                description="Learn about the thirdweb React components and hooks in thirdweb SDK"
            />

            <ArticleCard
                title="thirdweb Dashboard"
                href="https://thirdweb.com/dashboard"
                description="Deploy, configure, and manage your smart contracts from the dashboard."
            />
        </div>
    );
};

export default ThirdwebResources;