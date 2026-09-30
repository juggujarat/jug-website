import { useState } from 'react';
import BookYourSlotButton from '../components/BookYourSlotButton';
import { focusRing } from '../components/ui/focusRing';
import { isSpeakerSession, getSpeakerBySlug, formatTimeRange12 } from '../content';

// Talks render as "Session N: <speakers>" with the talk title underneath;
// other agenda slots render their own title/description.
function toRows(sessions) {
    let talkNumber = 0;
    return sessions.map((session) => {
        const time = formatTimeRange12(session.startTime, session.endTime);
        if (!isSpeakerSession(session)) {
            return { slug: session.slug, track: session.track, time, title: session.title, description: session.description };
        }
        talkNumber += 1;
        const names = session.speakers.map((slug) => getSpeakerBySlug(slug)?.name).filter(Boolean).join(', ');
        return { slug: session.slug, track: session.track, time, title: `Session ${talkNumber}: ${names}`, description: session.title };
    });
}

const Schedule = ({ sessions, tracks, registrationUrl }) => {
    const [track, setTrack] = useState(null);
    const rows = toRows(sessions);
    const visibleRows = track ? rows.filter((row) => !row.track || row.track === track) : rows;

    return (
        <div className="bg-[#FFFCEF]">
            <div className="container mx-auto xl:max-w-screen-xl">
                <div className='pt-[128px] pb-[155px] sm:pt-[50px] sm:pb-[50px]'>
                    <div className="flex flex-col items-center justify-center">
                        <div className='mt-[20px] sm:text-center'  data-aos="fade-down">
                            <h2 className="font-raleway font-medium text-[56px] leading-[62px] sm:text-[28px] sm:leading-[36px]">
                                Explore the Event Schedule!
                            </h2>
                        </div>
                        {tracks.length > 1 ? (
                            <div role="group" aria-label="Filter sessions by track" className="mt-[36px] flex flex-wrap justify-center gap-3">
                                {[{ slug: null, name: 'All tracks' }, ...tracks].map((option) => (
                                    <button
                                        key={option.name}
                                        type="button"
                                        aria-pressed={track === option.slug}
                                        onClick={() => setTrack(option.slug)}
                                        className={`rounded-full border border-black px-4 py-2 font-raleway font-medium text-[14px] transition-colors ${track === option.slug ? 'bg-black text-white' : 'bg-white hover:bg-[#EDD7FF]'} ${focusRing}`}
                                    >
                                        {option.name}
                                    </button>
                                ))}
                            </div>
                        ) : null}
                        <div className="mt-[36px] px-[10px]">
                            {visibleRows.map((event) => (
                                <div 
                                    key={event.slug} 
                                    id={event.slug}
                                    className="flex items-center gap-6 sm:flex-col sm:gap-0 border-b border-black"
                                    data-aos="fade-down"
                                >
                                    <div className="w-[200px] text-left sm:text-center">
                                        <p className="font-raleway font-medium text-[24px] leading-[62px] sm:text-[18px] sm:leading-[48px]">
                                            {event.time}
                                        </p>
                                    </div>
                                    <div className="flex-1 sm:text-center">
                                        <h3 className="font-raleway font-bold text-[20px] leading-[36px] sm:text-[18px] sm:leading-[32px] text-black">
                                            {event.title}
                                        </h3>
                                        <p className="font-raleway font-normal text-[16px] leading-[24px] sm:text-[16px] sm:leading-[24px] text-black">
                                            {event.description}
                                        </p>
                                    </div>
                                    <hr className="my-12 sm:my-0 sm:mt-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                                </div>
                            ))}
                        </div>

                        <div className='mt-[41px]'>
                            <BookYourSlotButton href={registrationUrl} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
