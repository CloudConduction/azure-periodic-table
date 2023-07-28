/* src/app/page.tsx */

'use client';
import { useEffect, useState } from 'react';
import { Item, columns } from './data';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AzureLogo } from '@/components/azure-logo';
import { Compass, type CompassData } from '@/components/compass';
import { Grid } from '@/components/grid';
import { CodeSnippet } from '@/components/code-snippet';
import PeriodicTable, { compassData } from '@/components/periodic-table';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Check, CopyCheckIcon, CopyIcon } from 'lucide-react';

export default function Page() {
  const [activeElement, setActiveElement] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [showCopy, setShowCopy] = useState(false);

  // after 2 seconds have copied be false if active
  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);

  // Add more functionality here if needed, like functions to add/remove groups or items

  return (
    <main className="flex-col min-h-screen items-center justify-center p-24 bg-slate-950">
      <Sheet onOpenChange={() => setOpen((prev) => !prev)} open={open}>
        <SheetContent className="bg-slate-950 sm:max-w-[720px]">
          <SheetHeader>
            <div className="flex justify-start items-center">
              <Image width={44} height={44} src={activeElement?.icon} />
              <div
                onMouseEnter={() => setShowCopy(true)}
                onMouseLeave={() => setShowCopy(false)}
                onClick={() => {
                  navigator.clipboard.writeText(activeElement?.slug ?? '');
                  setCopied(true);
                }}
                className={`relative ml-4 flex justify-start items-center text-sm flex break-all border py-2 px-6 cursor-pointer rounded-lg border-gray-500 hover:border-gray-200 transition-all mr-4`}
              >
                {showCopy && (
                  <div className="absolute top-[-3px] right-1">
                    {copied ? <Check width={12} /> : <CopyIcon width={12} />}
                  </div>
                )}

                <span>{activeElement?.slug}</span>
              </div>
            </div>

            <SheetTitle>
              <div className="flex justify-start items-center mt-4 mb-2">
                <span className="font-bold text-xl">{activeElement?.name}</span>
              </div>
            </SheetTitle>
            <CodeSnippet codeString={activeElement?.code ?? ''} />
            <span>{activeElement?.description}</span>
            <div className="mt-6">
              <span className="font-bold">Length</span>
              <div>
                <span>{activeElement?.length}</span>
              </div>
            </div>
            <div className="mt-6">
              <span className="font-bold">Restrictions:</span>
              <div>
                <span>{activeElement?.restrictions}</span>
                <span>{activeElement?.length}</span>
              </div>
            </div>

            <div className="flex justify-start items-center">
              {activeElement?.terraformUrl && (
                <a
                  target="_blank"
                  href={activeElement?.terraformUrl}
                  className="flex justify-start items-center text-sm flex break-all border p-2 rounded-lg border-gray-500 hover:border-gray-200 transition-all mr-4"
                >
                  <div className="mr-2">
                    <TerraformLogo width={24} height={24} />
                  </div>
                  <span>Terraform</span>
                </a>
              )}
              {activeElement?.learnUrl && (
                <a
                  target="_blank"
                  href={activeElement?.learnUrl}
                  className="flex justify-start items-center text-sm flex break-all border p-2 rounded-lg border-gray-500 hover:border-gray-200 transition-all"
                >
                  <div className="mr-2">
                    <Microsoft width={24} height={24} />
                  </div>
                  <span>Microsoft Learn</span>
                </a>
              )}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="flex justify-center items-center mb-4">
        <div className="mr-6">
          <AzureLogo />
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-4xl">Azure Resource</span>
          <span className="font-semibold text-2xl text-accent">
            Naming Convention Periodic Table
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Input
          onChange={(e) => setTextSearch(e?.target?.value)}
          className="bg-transparent w-80"
          placeholder="Search Azure resources..."
        />
      </div>

      <PeriodicTable
        textSearch={textSearch}
        setActiveElement={setActiveElement}
        setOpen={setOpen}
      />
    </main>
  );
}

function TerraformLogo({ width: width = 32, height: height = 32 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 128 128">
      <g fill-rule="evenodd">
        <path
          d="M77.941 44.5v36.836L46.324 62.918V26.082zm0 0"
          fill="#5c4ee5"
        ></path>
        <path
          d="M81.41 81.336l31.633-18.418V26.082L81.41 44.5zm0 0"
          fill="#4040b2"
        ></path>
        <path
          d="M11.242 42.36L42.86 60.776V23.941L11.242 5.523zm0 0M77.941 85.375L46.324 66.957v36.82l31.617 18.418zm0 0"
          fill="#5c4ee5"
        ></path>
      </g>
    </svg>
  );
}

function Microsoft({ width: width = 32, height: height = 32 }) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <path fill="#f25022" d="M7.097 7.097H24.14V24.14H7.097z" />
      <path fill="#7fba00" d="M25.859 7.097h17.043V24.14H25.859z" />
      <path fill="#00a4ef" d="M7.097 25.859H24.14v17.043H7.097z" />
      <path fill="#ffb900" d="M25.859 25.859h17.043v17.043H25.859z" />
    </svg>
  );
}
