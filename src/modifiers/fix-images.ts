import stringHash = require("string-hash");

const imageLinks = [
    "https://i.cbc.ca/1.3519548.1459783409!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/goose-outside-hagey-hall.jpg",
    "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwje5OPM093lAhWLpp4KHUHoCl8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.therecord.com%2Fnews-story%2F8369132-campus-program-aims-to-keep-students-and-aggressive-geese-apart%2F&psig=AOvVaw26jgnU9fYFrdooMRawJVou&ust=1573406897582898",
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Canada_goose_head_detail.JPG",
    "https://i.cbc.ca/1.1586567.1379151033!/httpImage/image.jpg_gen/derivatives/16x9_780/hi-canada-goose-852.jpg",
    "https://cdn.vox-cdn.com/thumbor/60v9e8jYFflCweoqtzostBz2NQ8=/0x0:3000x2000/1200x800/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/51941227/153852129.0.jpeg",
    "https://uwaterloo.ca/daily-bulletin/sites/ca.daily-bulletin/files/styles/sidebar-220px-wide/public/uploads/images/0429goose.jpg?itok=l3Su00Am",
    "https://pbs.twimg.com/profile_images/582594738349559808/u5P61x7o_400x400.jpg",
    "https://i.redd.it/5f4oplf0kt401.jpg",
    "https://pbs.twimg.com/profile_images/3533064044/a6dc92d6e0eed7581e85aac103a2f040.jpeg",
    "https://uwaterloo.ca/daily-bulletin/sites/ca.daily-bulletin/files/styles/body-500px-wide/public/uploads/images/0410goslings.png?itok=gjqTukOp",
    "https://uwaterloo.ca/library/sites/ca.library/files/uploads/images/img_0236_0.jpg",
    "https://uwaterloo.ca/library/circulation-blog/sites/ca.library.circulation-blog/files/uploads/images/uw_goose.jpg",
    "https://pbs.twimg.com/media/B5d_t2KIUAAVVoS.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4xScWwejTZimNtBFDGWajrZABQ8aVqMrLdMEh88ndB7IPDkGPw&s",
    "https://d1gzo5vknddaf.cloudfront.net/uploads/image/file/24310/attack.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToOHq00vsib3nrRnCGP-S3PEh9MmgfZdQIiJ-zL5WcoNdKFEAbGg&s",
    "https://cdn-images-1.medium.com/max/1490/0*OeRBY2gdkz9344qL",
    "http://www.bulletin.uwaterloo.ca//images/2012/0530geese.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJZaaCrZOhBrJ1m90jkK8kDdS9U0RWh4jNIk8_gasrrdB-lymPw&s",
    "https://www.kwrealestatenews.com/wp-content/uploads/2019/04/goose.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Canada_Goose_Gosling.jpg/299px-Canada_Goose_Gosling.jpg",
    "https://i.cbc.ca/1.4009126.1539186405!/cpImage/httpImage/canadian-geese.jpg",
    "https://s3-media3.fl.yelpcdn.com/bphoto/LD5uRshW_n4VPBxf7MR4SA/ls.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSnzmDK4TCL8r7jV6SmTSw04daSpltZ6eJtTGPIuLBtH2irG9upg&s",
    "http://www.24news.ca/images/obgrabber/2017-05/2bb798e13b.jpeg",
    "https://www.ctvnews.ca/polopoly_fs/1.2901718.1463178415!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg",
    "https://i.cbc.ca/1.1834105.1379227434!/httpImage/image.jpg_gen/derivatives/16x9_780/goose-quackers.jpg",
    "https://media.globalnews.ca/videostatic/666/859/Parking%20Lot%20Geese%20Still.jpg",
    "https://i1.wp.com/www.society19.com/ca/wp-content/uploads/sites/2/2017/04/UWaterlooGoose.jpg?fit=800%2C492&ssl=1",
    "https://media-cdn.tripadvisor.com/media/photo-s/0c/e1/6b/67/a-single-goose-floats.jpg",
    "https://s3-media4.fl.yelpcdn.com/bphoto/v2gPO8DsdgUjAsW-tQddIw/o.jpg",
    "https://s3-media1.fl.yelpcdn.com/bphoto/pt0oY2s0nyfEIMDNydCjhA/348s.jpg",
    "http://i.imgur.com/FSzl9s3.jpg",
    "https://uwaterloo.ca/math/sites/ca.math/files/uploads/images/121.jpg",
    "https://pbs.twimg.com/media/ClpItScWgAAtwuV.jpg",
    "https://uwaterloo.ca/world-wetlands-day/sites/ca.world-wetlands-day/files/styles/wide-body-750px-wide/public/uploads/images/dc.jpg?itok=csjQ3tHn",
];

const protectedImages = [
    "About this sound",
    "This is a",
    "protected",
];

export function fixImages(text: string) {
    return text
        .replace(
            /<img.*\/>/g,
            (imageTag) => {
                if (protectedImages.some((protectedImage) => imageTag.includes(protectedImage))) { return imageTag; }
                return imageTag
                    .replace(
                        /srcset\="(.*)"|src\="(.*)"/,
                        (_, p1, p2) => {
                            const url = p1 || p2;
                            return `src="${imageLinks[stringHash(url) % imageLinks.length]}" style="max-width:250px"`;
                        },
                    );
            },
        )
        .replace(
            /background-image: ?url\(([^\)]*)\)/g,
            (_, p1) => {
                const url = p1;
                return `background-image: url(${imageLinks[stringHash(url) % imageLinks.length]})`;
            },
        );
}
