"use client";

import { PdfViewerOverlay } from '@/components/results/pdf-viewer-overlay';
import { usePdfStore } from '@/stores/pdf';
import { LabResult } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { use } from 'react';


interface ResultPageProps {
  params: Promise<{ id: string }>;
}

export default function ResultPage({ params } : ResultPageProps) {
    const { id } = use(params); 
    const [result, setResult] = useState<{ id: string; info: LabResult } | null>(null);
    const { selected, clearSelected } = usePdfStore();
    const router = useRouter();

    useEffect(() => {
        if(selected){
            setResult({
                id: id,
                info: selected
            })
        }
    }, [selected, id])


    const handleClosePdfViewer = () => {
        clearSelected();
        setResult(null);
        router.replace("/dashboard");
    }

    return (
        <PdfViewerOverlay
          isOpen={!!result}
          onClose={handleClosePdfViewer}
          resultId={result?.id || ""}
          resultInfo={result?.info}
        />
    )
}
