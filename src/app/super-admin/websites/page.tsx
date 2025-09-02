
import { WebsiteListEditor } from "@/components/admin/website-list-editor";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function WebsiteEditorSkeleton() {
    return (
        <Card>
            <CardContent className="p-6">
                <Skeleton className="h-8 w-1/4 mb-4" />
                <Skeleton className="h-64 w-full" />
            </CardContent>
        </Card>
    )
}


export default function WebsitesManagementPage() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Website Management</h1>
            <div className="max-w-4xl">
                 <Suspense fallback={<WebsiteEditorSkeleton />}>
                    <WebsiteListEditor />
                </Suspense>
            </div>
        </>
    )
}
