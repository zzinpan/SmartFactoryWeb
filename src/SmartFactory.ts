export default class SmartFactory {

    static LibraryRootUrl: string = "./Build";

    element: {
        [key: string]: HTMLElement
    } = {
        container: null,
        canvas: null
    };

    unityEventKey: string;
    unityInstance: any;

    constructor( containerElementQuery: htmlElementOrString ) {

        this.unityEventKey = Math.random().toString().replace(".", "");

        if( typeof containerElementQuery === "string" ){
            this.element.container = document.querySelector( containerElementQuery );
        }else{
            this.element.container = containerElementQuery;
        }

        this.element.canvas = document.createElement("canvas");
        this.element.canvas.id = this.unityEventKey;
        this.element.container.appendChild( this.element.canvas );

        const onWindowResize = () => {

            const boundingRect = this.element.container.getBoundingClientRect();
            const canvas = ( this.element.canvas as HTMLCanvasElement );

            canvas.width = boundingRect.width;
            canvas.height = boundingRect.height;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;

        };
        window.addEventListener("resize", onWindowResize);
        onWindowResize();

    }

    static async ready( libraryRootUrl: string = SmartFactory.LibraryRootUrl ): Promise<void> {

        return new Promise(( resolve, reject) => {

            if( libraryRootUrl !== SmartFactory.LibraryRootUrl ){
                SmartFactory.LibraryRootUrl = libraryRootUrl;
            }

            const libraryUrl = `${SmartFactory.LibraryRootUrl}/SmartFactoryLibrary.loader.js`;
            if( document.querySelector(`script[src='${libraryUrl}']`) != null ){
                reject( new Error("이미 SmartFactoryLibrary 스크립트가 로드되었습니다.") );
            }

            const libraryScriptNode = document.createElement("script");
            libraryScriptNode.addEventListener("load", () => {
                resolve();
            });
            libraryScriptNode.src = libraryUrl;

            const headNode = document.querySelector('head');
            headNode.appendChild( libraryScriptNode );

        });

    }

    async ready(): Promise<void> {

        let rafId = null;

        /**
         * 유니티가 로드 가능한 시점이 되었을 때, 후행 작업을 진행한다.
         */
        const waitForUnityReady = () => {

            if( window.createUnityInstance == null ){
                rafId = requestAnimationFrame( waitForUnityReady );
                return;
            }

            cancelAnimationFrame( rafId );
            createUnityInstance(this.element.canvas, {
                dataUrl: `${SmartFactory.LibraryRootUrl}/SmartFactoryLibrary.data`,
                frameworkUrl: `${SmartFactory.LibraryRootUrl}/SmartFactoryLibrary.framework.js`,
                codeUrl: SmartFactory.LibraryRootUrl + "/SmartFactoryLibrary.wasm",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "DefaultCompany",
                productName: "SmartFactoryLibrary",
                productVersion: "0.1",
                showBanner: null,
            }, (progress) => {

                console.log( 100 * progress + "%" );

            }).then((unityInstance) => {

                return new Promise(( resolve, reject ) => {

                    this.unityInstance = unityInstance;
                    function onCompleteSetEventKey(){
                        window.removeEventListener( "completeSetEventKey", onCompleteSetEventKey, false );
                        resolve(null);
                    }
                    window.addEventListener( "completeSetEventKey", onCompleteSetEventKey, false );
                    this.unityInstance.SendMessage( "SmartFactory", "setEventKey", this.unityEventKey );

                });

            }).catch((message) => {

                alert(message);

            });

        }
        waitForUnityReady();

    }

}